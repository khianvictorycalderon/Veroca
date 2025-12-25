import { NextRequest, NextResponse } from "next/server";
import pool from "@/utils/db";
import { dev } from "@/utils/dev-log";
import { handleQuery } from "@/utils/qr-helper";

// ----------------------------
// GET: Retrieve orders for the logged-in user
export async function GET(req: NextRequest) {
  try {
    const sessionToken = req.cookies.get("session_token")?.value;

    if (!sessionToken) {
      dev.log("Failed: No session token");
      return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
    }

    // Get user ID from session
    const sessionResult = await pool.query(
      `SELECT user_id FROM user_sessions WHERE session_token = $1 AND expires_at > NOW()`,
      [sessionToken]
    );

    if (sessionResult.rows.length === 0) {
      dev.log(`Failed: Invalid or expired session ${sessionToken}`);
      return NextResponse.json({ message: "Session expired or invalid" }, { status: 401 });
    }

    const userId = sessionResult.rows[0].user_id;

    const ordersResult = await pool.query(
      `SELECT id, name, customers FROM orders WHERE user_id = $1 ORDER BY created_at DESC`,
      [userId]
    );

    dev.log(`Success: Retrieved orders for user ${userId}`);
    return NextResponse.json({ message: "Orders retrieved successfully", data: ordersResult.rows }, { status: 200 });
  } catch (err: any) {
    dev.log(`Failed: ${err.message}`);
    return NextResponse.json({ message: "Failed to retrieve orders" }, { status: 500 });
  }
}

// ----------------------------
// POST: Add a new order
export async function POST(req: NextRequest) {
  return handleQuery(async () => {
    const sessionToken = req.cookies.get("session_token")?.value;

    if (!sessionToken) {
      dev.log("Failed: No session token");
      return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
    }

    const sessionResult = await pool.query(
      `SELECT user_id FROM user_sessions WHERE session_token = $1 AND expires_at > NOW()`,
      [sessionToken]
    );

    if (sessionResult.rows.length === 0) {
      dev.log(`Failed: Invalid or expired session ${sessionToken}`);
      return NextResponse.json({ message: "Session expired or invalid" }, { status: 401 });
    }

    const userId = sessionResult.rows[0].user_id;
    const { name } = await req.json();

    if (!name || name.trim() === "") {
      return NextResponse.json({ message: "Order name is required" }, { status: 400 });
    }

    const insertResult = await pool.query(
      `INSERT INTO orders (user_id, name, customers) VALUES ($1, $2, $3) RETURNING id, name, customers`,
      [userId, name, JSON.stringify([])]
    );

    dev.log(`Success: Added order for user ${userId}`);
    return NextResponse.json({ message: "Order added successfully", order: insertResult.rows[0] }, { status: 201 });
  }, "Failed to add order");
}

// ----------------------------
// PATCH: Update order name or customers
export async function PATCH(req: NextRequest) {
  return handleQuery(async () => {
    const sessionToken = req.cookies.get("session_token")?.value;

    if (!sessionToken) {
      dev.log("Failed: No session token");
      return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
    }

    const sessionResult = await pool.query(
      `SELECT user_id FROM user_sessions WHERE session_token = $1 AND expires_at > NOW()`,
      [sessionToken]
    );

    if (sessionResult.rows.length === 0) {
      dev.log(`Failed: Invalid or expired session ${sessionToken}`);
      return NextResponse.json({ message: "Session expired or invalid" }, { status: 401 });
    }

    const userId = sessionResult.rows[0].user_id;
    const { id, name, customers } = await req.json();

    if (!id) {
      return NextResponse.json({ message: "Order ID is required" }, { status: 400 });
    }

    const updateResult = await pool.query(
      `UPDATE orders
       SET name = COALESCE($1, name),
           customers = COALESCE($2, customers),
           updated_at = NOW()
       WHERE id = $3 AND user_id = $4
       RETURNING id, name, customers`,
      [name, customers ? JSON.stringify(customers) : null, id, userId]
    );

    if (updateResult.rowCount === 0) {
      return NextResponse.json({ message: "Order not found or access denied" }, { status: 404 });
    }

    dev.log(`Success: Updated order ${id} for user ${userId}`);
    return NextResponse.json({ message: "Order updated successfully", order: updateResult.rows[0] }, { status: 200 });
  }, "Failed to update order");
}

// ----------------------------
// DELETE: Remove an order
export async function DELETE(req: NextRequest) {
  return handleQuery(async () => {
    const sessionToken = req.cookies.get("session_token")?.value;

    if (!sessionToken) {
      dev.log("Failed: No session token");
      return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
    }

    const sessionResult = await pool.query(
      `SELECT user_id FROM user_sessions WHERE session_token = $1 AND expires_at > NOW()`,
      [sessionToken]
    );

    if (sessionResult.rows.length === 0) {
      dev.log(`Failed: Invalid or expired session ${sessionToken}`);
      return NextResponse.json({ message: "Session expired or invalid" }, { status: 401 });
    }

    const userId = sessionResult.rows[0].user_id;
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json({ message: "Order ID is required" }, { status: 400 });
    }

    const deleteResult = await pool.query(
      `DELETE FROM orders WHERE id = $1 AND user_id = $2 RETURNING id`,
      [id, userId]
    );

    if (deleteResult.rowCount === 0) {
      return NextResponse.json({ message: "Order not found or access denied" }, { status: 404 });
    }

    dev.log(`Success: Deleted order ${id} for user ${userId}`);
    return NextResponse.json({ message: "Order deleted successfully", deletedId: id }, { status: 200 });
  }, "Failed to delete order");
}