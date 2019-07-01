export async function handlerError(response) {
    if (!response.ok) {
        throw new Error((await response.json()).message);
    }

    return response.json();
}
