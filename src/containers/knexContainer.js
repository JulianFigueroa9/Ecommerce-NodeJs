class KnexContainer {
	constructor(knex, table) {
		this.knex = knex;
		this.table = table;
	}

	async save(obj) {
		try {
			await this.knex(this.table).insert(obj);
			return { message: "Producto agregado" };
		} catch (error) {
			console.log(`Error al guardar el producto: ${error}`);
		}
	}

	async getByID(id) {
		try {
			let item = await this.knex.from(this.table).select("*").where({ id: id });
			return item[0];
		} catch (error) {
			console.log(`Error al buscar el producto: ${error}`);
		}
	}

	async getAll() {
		try {
			let items = await this.knex.from(this.table).select("*");
			return items;
		} catch (error) {
			console.log(error);
		}
	}

	async updateByID(id, product) {
		try {
			await this.knex.from(this.table).where({ id: id }).update({ ...product });
			return { message: "Producto actualizado" };
		} catch (error) {
			console.log(`Error al actualizar el producto: ${error}`);
		}
	}


	async deleteByID(id) {
		try {
			await this.knex.from(this.table).where({ id: id }).del();
			return { message: "Producto eliminado" };
		} catch (error) {
			console.log(`Error al eliminar el producto: ${error}`);
		}
	}

	async deleteAll() {
		try {
			await this.knex.from(this.table).del();
			return { message: "Todos los productos eliminados" };
		} catch (error) {
			console.log(`Error al eliminar los productos: ${error}`);
		}
	}
}

module.exports = KnexContainer