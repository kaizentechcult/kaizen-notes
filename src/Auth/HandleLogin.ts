interface Props {
  data: {
    email: string;
    password: string;
  };
}

const apiKey = import.meta.env.VITE_BASE_URL;

export const HandleLogin = async (props: Props) => {
  try {
    const response = await fetch(apiKey.concat("/login"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(props.data),
    });
    const result = await response.json();
    if (result.token == null) {
      return result;
    }
    localStorage.setItem("token", result.token);
    return result;
  } catch (error) {
    console.error("Error sending data:", error);
  }
};
