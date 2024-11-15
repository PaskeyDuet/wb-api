export default {
    getCurrDate: (): string => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, "0"); // Месяцы начинаются с 0
        const day = String(today.getDate()).padStart(2, "0");

        return `${year}-${month}-${day}`;
    },
    getFormatedDate: (dateString: string): string => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0"); // Месяцы начинаются с 0
        const day = String(date.getDate()).padStart(2, "0");

        return `${year}-${month}-${day}`;
    },
    getFormatedDateFromDate: (date: Date): string => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0"); // Месяцы начинаются с 0
        const day = String(date.getDate()).padStart(2, "0");

        return `${year}-${month}-${day}`;
    },
};
