'use client';

// This is a client component only!
export const handleAPIRequest = async <T>(
  action: () => Promise<T>,
  errMessage: string,
  errAction: () => Promise<void> = async () => {},
  finalAction: () => Promise<void> = async () => {}
): Promise<T | undefined> => {
  try {
    return await action();
  } catch (err: unknown) {
    const message =
      err instanceof Error
        ? `${errMessage}: ${err.message}`
        : `${errMessage}: ${String(err)}`;

    if (process.env.NODE_ENV === "development") {
        // Only show logs on development only
        alert(message);
        console.error(message);
    }

    await errAction();
    return undefined;

  } finally {
    await finalAction();
  }
};

/*
  Example Usage 1:
  useEffect(() => {
    async function fetchAllUsers() {
        return handleAPIRequest(
            async () => {
                const res = await axios.get("/api/user");
                setUsers(res.data.users);
            },
            "Unable to fetch users",
            async () => {},
            async () => {
                setIsFetching(false);
            }
        );
     }
     fetchAllUsers();
  },[]);

  Example Usage 2:
  useEffect(() => {
    const fetchAllUsers = async () =>
        handleAPIRequest(
            async () => {
                const res = await axios.get("/api/user");
                setUsers(res.data.users);
            },
            "Unable to fetch users",
            async () => {},
            async () => {
                setIsFetching(false);
            }
        );
     fetchAllUsers();
  },[]);

*/