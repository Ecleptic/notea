import { SSRMiddleware } from '../connect'

export const applyTree: SSRMiddleware = async (req, res, next) => {
  let tree

  // TODO: Share the page to get the specified tree structure
  if (req.props.isLoggedIn) {
    try {
      tree = await req.state.treeStore.get()
    } catch (error) {
      res.APIError.NOT_FOUND.throw(error?.message)
    }
  }

  req.props = {
    ...req.props,
    ...(tree && { tree }),
  }

  next()
}
