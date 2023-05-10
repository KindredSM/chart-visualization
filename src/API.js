import axios from "axios";

export async function fetchData() {
  const options = {
    method: "GET",
    url: "https://openai80.p.rapidapi.com/models",
    headers: {
      "X-RapidAPI-Key": "954426d6d4msh7bb69db5db0d694p1209fejsn47a2b85a28de",
      "X-RapidAPI-Host": "openai80.p.rapidapi.com",
    },
  };

  try {
    const data = response.data;
    const response = await axios.request(options);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}
