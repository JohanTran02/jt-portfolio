import { Vector3 } from "three";

export interface ICubeFaces {
  color: CubeFaceColors;
  vector3: Vector3;
}

export type CubeFaceColors =
  | "white"
  | "yellow"
  | "red"
  | "orange"
  | "blue"
  | "green";

export const cubeFaces: ICubeFaces[] = [
  // right
  { color: "white", vector3: new Vector3(1, 0, 0) },
  // left
  { color: "yellow", vector3: new Vector3(-1, 0, 0) },
  // top
  { color: "red", vector3: new Vector3(0, 1, 0) },
  // bottom
  { color: "orange", vector3: new Vector3(0, -1, 0) },
  // front
  { color: "blue", vector3: new Vector3(0, 0, 1) },
  // back
  { color: "green", vector3: new Vector3(0, 0, -1) },
];