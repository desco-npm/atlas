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
      if (data[Atlas.Config.get('Orm.pkName')]) {
        return this.change(data, options)
      }
      else {
        return this.insert(data, options)
      }
    },
    insert (data, options = {}) {
      return this.create(data, options)
        .then(response => {
          const id = response.toJSON()[Atlas.Config.get('Orm.pkName')]

          return this.read(id)
        })
        .catch(e => {
          return e
        })
    },
    change(body, options = {}) {
      return this.update(body, {
        ...options,
        where: {
          [Atlas.Config.get('Orm.pkName')]: body[Atlas.Config.get('Orm.pkName')],
        },
      })
        .then(async () => {
          return this.read(body[Atlas.Config.get('Orm.pkName')], options)
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
            [Atlas.Config.get('config.Orm.pkName')]: {
              [ Op.in ]: ids.split(';'),
            },
          },
        })),
      }
    },
  }
}