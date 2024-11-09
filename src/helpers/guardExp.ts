const guardExp: (data: unknown, message: string) => asserts data is NonNullable<unknown> = (data, message) => {
    if (!data) {
        console.log("guardExp was called");
        throw new Error(message + " is null or undefined" + "\nInvalid data: data cannot be null or undefined");
    }
};

export default guardExp;
