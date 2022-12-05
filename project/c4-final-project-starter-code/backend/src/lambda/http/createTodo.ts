import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import 'source-map-support/register'
import * as middy from 'middy'
import { cors } from 'middy/middlewares'
import { CreateTodoRequest } from '../../requests/CreateTodoRequest'
import { getUserId } from '../utils';
import { createTodo } from '../../helpers/todosAcess'
import { todoBuilder } from '../../helpers/todos'

export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const newTodo: CreateTodoRequest = JSON.parse(event.body)
    // TODO: Implement creating a new TODO item
 logger.info('Going to event: ', event)

  const newTodo: CreateTodoRequest = JSON.parse(event.body)
  const user = getUserId(event)
  const newItem = await createTodoItem(newTodo, user)

  logger.info('Value of newItem ', newItem)

  return {
    statusCode: 201,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    },
    body: JSON.stringify({
      item: {
        ...newItem
      }
    })
  }
 }  
handler.use(
  cors({
    credentials: true
  })
)
