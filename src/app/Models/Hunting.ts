import { Competition } from "./Competition";
import { Fish } from "./Fish";
import { Member } from "./Member";


export interface Hunting{
    id: number,
    numberOfFishes: number,
    fish: Fish,
    member: Member,
    competition: Competition
}