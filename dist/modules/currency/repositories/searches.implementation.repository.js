export class SearchesMemoryRepository {
    constructor() {
        this.items = [];
    }
    async save(data) {
        this.items.push(data);
        return data;
    }
    async showAll() {
        return this.items;
    }
}
