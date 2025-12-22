import { SetStateAction } from "react";
import axios from "axios";

export const handleAPIRequest = async <T>(
  action: () => Promise<T>,
  errMessage: string,
  setErrorMessage: React.Dispatch<SetStateAction<string>>,
  errAction: () => Promise<void> = async () => {},
  finalAction: () => Promise<void> = async () => {}
): Promise<T | undefined> => {
  try {
    return await action();
  } catch (err: unknown) {
    let message = "";

    if (axios.isAxiosError(err)) {
      message = err.response?.data?.message
        ? `${errMessage}: ${err.response.data.message}`
        : `${errMessage}: ${err.message}`;
    } else if (err instanceof Error) {
      message = `${errMessage}: ${err.message}`;
    } else {
      message = `${errMessage}: ${String(err)}`;
    }

    if (process.env.NODE_ENV === "development") {
      alert(message);
      console.error(message);
    }

    setErrorMessage(message);
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
            setError, // <-- pass your setState function
            async () => {}, // optional errAction
            async () => {
                setIsFetching(false); // optional finalAction
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
            setError, // <-- pass your setState function
            async () => {},
            async () => {
                setIsFetching(false);
            }
        );
     fetchAllUsers();
  },[]);

  Example Usage 3: Login Form Submission
  const onSubmit = (data: LoginFormData) => {
      setIsSubmitting(true);
      handleAPIRequest(
          async () => {
              const res = await axios.post("/api/login", {
                  username: data.login_username,
                  password: data.login_password,
              });
              console.log("Login successful:", res.data);
              setPage("dashboard"); // navigate or update UI
          },
          "Unable to login",
          setError, // <-- pass your setError state setter
          async (message: string) => {
              console.log("Optional additional error handling:", message);
          },
          async () => {
              setIsSubmitting(false); // finalAction
          }
      );
  };
*/