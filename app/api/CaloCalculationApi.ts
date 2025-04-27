const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;

export async function caloCalculateApi(formData: FormData) {

    const response = await fetch(`${baseURL}/api/image_analysis`, {
        method: 'POST',
        body: formData,
    })

    if(!response.ok) {
        throw new Error("Failed to fetch data");
    }
    return response.json();

}