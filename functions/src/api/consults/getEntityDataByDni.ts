import { NextFunction, Request, Response } from "express";
import { getPersonDataByDni } from "../../client-api/apis-net-pe";
import { isEmpty } from "lodash";

interface Params {
  dni: string;
}

export const getEntityDataByDni = async (
  req: Request<Params, unknown, unknown, unknown>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const {
    params: { dni },
  } = req;

  console.log("「Get entity data」Initialize", dni, {
    params: req.params,
  });

  try {
    const entityData = await getPersonDataByDni({ dni });

    if (isEmpty(entityData)) {
      res.status(412).send("consults/not_found_entity_by_dni").end();
      return;
    }

    res.send(entityData).end();
  } catch (error) {
    console.error(error);
    next(error);
  }
};
