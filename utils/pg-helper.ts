import { dev } from './dev-log';
import { NextResponse } from 'next/server';

export const handleQuery = async (
  action: () => Promise<NextResponse>,
  errMessage: string,
  errAction: () => Promise<void> = async () => {},
  finalAction: () => Promise<void> = async () => {}
): Promise<NextResponse> => {
  try {
    return await action();
  } catch (err: unknown) {
    const message =
      err instanceof Error
        ? `${errMessage}: ${err.message}`
        : `${errMessage}: ${String(err)}`;

    // Log error
    dev.log(message);

    await errAction();

    // Return JSON error response
    return NextResponse.json({ error: message }, { status: 500 });
  } finally {
    await finalAction();
  }
};

/*
 Example Usage:
export async function GET() {
  return handleQuery(
    async () => {
      // Your DB or server logic here
      const data = { message: "Hello world!" };
      return NextResponse.json(data, { status: 200 });
    },
    "Failed to fetch data",
    async () => {
      // Optional: custom error action
    },
    async () => {
      // Optional: final action after try/catch
    }
  );
}
*/
