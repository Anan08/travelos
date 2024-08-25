export default function randomIdGenerator() {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvvwxyz1234567890!@#$%^&*()_+-=";
    let result = "";
    let counter = 0;
    const length = 15
    while (counter < length) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
        counter += 1;
    }
    return result;
}

