import { useContext, useEffect, useState } from "react";
import { ElvisContext } from "..";

export function useElvis() {
  return useContext(ElvisContext);
}
