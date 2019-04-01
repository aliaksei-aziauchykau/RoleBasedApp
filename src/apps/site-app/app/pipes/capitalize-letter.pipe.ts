// @branchOrigin site/Products/Forms.Westlaw/app/FormBuilder/src/utils/pipes/truncate.pipe.ts

import { Pipe, PipeTransform }	from "@angular/core";

@Pipe({name: "capitalize"})
export class CappitalizeLetterPipe implements PipeTransform {

    transform (value: string): string {
        const str = value.toLowerCase();
        const result: string = str.charAt(0).toUpperCase() + str.slice(1);
        return result;
    }
}