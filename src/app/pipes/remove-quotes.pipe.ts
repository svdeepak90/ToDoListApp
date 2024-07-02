import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'removeQuotes'
})
export class RemoveQuotesPipe implements PipeTransform {

  transform(value: any): any {
    if (!value) {
      return value;
    }
    return value.replace(/\"([^(\")"]+)\":/g,"$1:").replace(/\"/g, "");
  }

}
