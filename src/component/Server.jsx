async function query(text) {
    const response = await fetch(
        "https://bluetab-tf.onrender.com/api/v1/prediction/cea7bf3b-09cc-428f-8a6c-680f4ed8569d",
        {
            headers: {
                Authorization: "Bearer UkSPDtUaxO6itP9y+3MSUHoZ9cstV5Rg2cL7WTqCb1o=",
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify(text)
        }
    );
    
    const result = await response.json();
    return result;
}

query({"question": "Hey, how are you?"}).then((response) => {
    console.log(response);
});