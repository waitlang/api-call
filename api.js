
const url = "https://api.weatherstack.com/current?access_key=9928388c82f52cd76f6d62a9027b7336&query=New York";
const options = {
    method: "GET",
};

try {
    const response = await fetch(url, options);
    const result = await response.text();
    console.log(result);
} catch (error) {
    console.error(error);
}