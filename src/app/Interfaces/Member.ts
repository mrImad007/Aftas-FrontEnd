import { identityDocumentType } from "./identityDocumentType"

export interface Member {
  num: number,
  name: string,
  familyName: string,
  accessionDate: Date
  nationality: string
  identityDocumentType: identityDocumentType,
  identiyNumber: string
  }
  