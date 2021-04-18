import { BadRequestException, PipeTransform } from "@nestjs/common";
import { TaskStatus } from "../task.model";

export const allowedStatus = [
    TaskStatus.OPEN,
    TaskStatus.IN_PROGRESS,
    TaskStatus.DONE
]

export class TaskStatusValidationPipe implements PipeTransform {
    readonly allowedStatus = allowedStatus

    transform(value: string) {
        value = value.toUpperCase();

        if (!this.isStatusValid(value)) {
            throw new BadRequestException(`${value} is not valid status`);
        }

        return value;
    }

    private isStatusValid(status: any) {
        const idx = this.allowedStatus.indexOf(status)
        return idx !== -1;
    }
}