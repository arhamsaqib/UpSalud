import {get, post} from '../requestStructure';

const endpoint = 'twilio-token/';

export async function getVideoTokenTwilio(data: {
  identity: string;
  room: string;
}) {
  const res = await post(endpoint, data);
  return res;
}
