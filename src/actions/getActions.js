export const getAllData = () => {
    async function getData() {
        const URL =
        "https://jsonplaceholder.typicode.com/posts";

        const response = await fetch(URL, {
            "Content-Type": "application/json",
            method: "GET"
        });

        const data = await response.json();
        // console.log(data)
        return data
        // console.log("actions",data)
    }
    return (dispatch) => {
        getData()
        .then((data) => {
            if (data.length>0) {
            dispatch({
                type: "ALL_DATA",
                data,
            });
            } else {
            console.log("Error In Loading Data");
            }
        })
        .catch((error) => {
            console.log(error);
        });
    };
};