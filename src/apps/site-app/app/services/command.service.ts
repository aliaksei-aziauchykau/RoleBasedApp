import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { CommandType } from "../enums/command-type.enum";


@Injectable()
export class CommandService {
   public commandInvoker: Subject<CommandType> = new Subject();
}