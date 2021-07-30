// Necessary parts
import Atlas from '../../'

// Framework Modules
import ORM from '../../ORM/'

// Types
import { ServerRouterParams, ServerRouterMiximParams, } from '../types'

const defaultScopeRouter = Atlas.defaultScopeRouter

export default (
  { Express, }: ServerRouterParams, { entity, connection = 'default' }: ServerRouterMiximParams
): void => {
  // Prefix of routes
  const prefix = `${defaultScopeRouter}/${entity}`

  // The entity repository
  const Repository = ORM.getRepository(entity)

  // CREATE / UPDATE
  Express.post(prefix, async (req, res) => {
    res.json(await Repository?.save(req.body))
  })

  // LIST
  Express.get(`${prefix}`, async (req, res) => {
    res.json(await Repository?.findAndCount())
  })

  // READ
  Express.get(`${prefix}/:id`, async (req, res) => {
    res.json(await Repository?.findOne(req.params.id))
  })

  // DELETE
  Express.delete(`${prefix}/:id`, async (req, res) => {
    res.json(await Repository?.delete(req.params.id))
  })
}