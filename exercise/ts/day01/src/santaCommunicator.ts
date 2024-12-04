import { Logger } from "./logger";
import { Reindeer } from "./reindeer";
import { Configuration } from "./configuration";

export class SantaCommunicator {
  private readonly configuration: Configuration;

  constructor(configuration: Configuration) {
    this.configuration = configuration;
  }

  public composeMessage(reindeer: Reindeer): string {
    const daysBeforeReturn = this.daysBeforeReturn(
      reindeer.numbersOfDaysForComingBack,
    );
    return `Dear ${reindeer.name}, please return from ${reindeer.location} in ${daysBeforeReturn} day(s) to be ready and rest before Christmas.`;
  }

  public isOverdue(reindeer: Reindeer, logger: Logger): boolean {
    if (this.daysBeforeReturn(reindeer.numbersOfDaysForComingBack) <= 0) {
      logger.log(`Overdue for ${reindeer.name} located ${reindeer.location}.`);
      return true;
    }
    return false;
  }

  private daysBeforeReturn(numbersOfDaysForComingBack: number): number {
    return (
      this.configuration.numberOfDaysBeforeChristmas -
      numbersOfDaysForComingBack -
      this.configuration.numberOfDaysToRest
    );
  }
}
