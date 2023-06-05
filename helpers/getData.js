export default async function (url) {
    try {
        const response = await fetch(url);
        if(response.ok) {
            const data = await response.json();
            return {
                status: true,
                data: data
            }
        }
        else {
            alert('Error with download data');
            return {
                status: false,
                data: 'Error with parcing data'
            }
        }
    }
    catch {
        alert('Error with download data');
        return {
            status: false,
            data: 'Data is undefined'
        }
    }
}