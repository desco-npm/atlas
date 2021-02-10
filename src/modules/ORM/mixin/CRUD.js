module.exports = ({ Op, }) => {
  return {
    async select (params) {
      return this.findAndCountAll(Atlas.Orm.treatParameters(params))
        .then(result => {
          result.rows = result.rows.map(i => i.toJSON())

          return result
        })
        .catch(e => {
          return e
        })
    },
    async selectOne (params) {
      return this.findOne(Atlas.Orm.treatParameters(params))
        .then(response => response ? response.toJSON(): null)
    },
    async selectById (id, options = {}) {
      return (await this.findByPk(id, options)).toJSON()
    },
    async selectOrCreate (params) {
      return this.findOrCreate({
        where: Atlas.Orm.treatParameters(params).where,
        defaults: params.create,
      })
        .then(result => {
          result[0] = result[0].toJSON()

          return result
        })
        .catch(e => console.log(e))
    },
    save (data, options = {}) {
      if (data.id) {
        return this.change(data, options)
      }
      else {
        return this.insert(data, options)
      }
    },
    insert (data, options = {}) {
      return this.create(data, options)
        .then(response => {
          return this.read(response.id)
        })
        .catch(e => {
          return e
        })
    },
    change (body, options = {}) {
      return this.update(body, { ...options, where: { id: body.id, }, })
        .then(async () => {
          return this.read(body.id)
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