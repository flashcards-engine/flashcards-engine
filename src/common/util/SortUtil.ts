export default {
    getAscendingSort: (fieldName: string) => {
        return (a: any, b: any): number => {
            if (a[fieldName] > b[fieldName]) {
                return 1;
            } else if (a[fieldName] < b[fieldName]) {
                return -1;
            }
            return 0;
        }
    }
}