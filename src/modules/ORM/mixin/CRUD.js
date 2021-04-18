module.exports = ({ Op, }) => {
  return {
    async select (params) {
      return this.findAndCountAll(params)
        .then(result => {
          result.rows = result.rows.map(i => i.toJSON())

          return result
        })
        .catch(e => {
          return e
        })
    },
    async selectOne (params) {
      return this.findOne(params)
        .then(response => response ? response.toJSON(): null)
    },
    async selectById (id, options = {}) {
      return (await this.findByPk(id, options)).toJSON()
    },
    async selectOrCreate (params) {
      return this.findOrCreate({
        where: params.where,
        defaults: params.create,
      })
        .then(result => {
          result[0] = result[0].toJSON()

          return result
        })
        .catch(e => console.log(e))
    },
    save (data, options = {}) {
      if (data[process.env.Atlas.Orm.pkName]) {
        return this.change(data, options)
      }
      else {
        return this.insert(data, options)
      }
    },
    insert (data, options = {}) {
      return this.create(data, options)
        .then(response => {
          return this.read(response[process.env.Atlas.Orm.pkName])
        })
        .catch(e => {
          return e
        })
    },
    change(body, options = {}) {
      return this.update(body, {
        ...options,
        where: {
          [process.env.Atlas.Orm.pkName]: body[process.env.Atlas.Orm.pkName],
        },
      })
        .then(async () => {
          return this.read(body[process.env.Atlas.Orm.pkName])
        })
        .catch(e => {
          return e
        })
    },
    async read (id, options = {}) {
      return this.selectById(id, options)
    },
    async delete (ids, options = {}) {
      return {
        count: (await this.destroy({
          ...options,
          where: {
            id: {
              [ Op.in ]: ids.split(';'),
            },
          },
        })),
      }
    },
  }
}