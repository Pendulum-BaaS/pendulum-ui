import type { PendulumClient } from "../../../pendulum-sdk/src/pendulumClient";

export interface Document {
  id: string;
  [key: string]: any;
}

export interface Collection {
  name: string;
  documents: Document[];
}
