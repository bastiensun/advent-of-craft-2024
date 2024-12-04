import { SantaCommunicator } from "../src/santaCommunicator";
import { TestLogger } from "./doubles/testLogger";
import { Reindeer } from "../src/reindeer";
import { Configuration } from "../src/configuration";

const numberOfDaysToRest = 2;
const numberOfDaysBeforeChristmas = 24;

describe("SantaCommunicator", () => {
  let communicator: SantaCommunicator;
  let logger: TestLogger;

  beforeEach(() => {
    communicator = new SantaCommunicator(
      new Configuration(numberOfDaysToRest, numberOfDaysBeforeChristmas),
    );
    logger = new TestLogger();
  });

  test("composeMessage", () => {
    const message = communicator.composeMessage(reindeer(5));
    expect(message).toEqual(
      "Dear Dasher, please return from North Pole in 17 day(s) to be ready and rest before Christmas.",
    );
  });

  test("shouldDetectOverdueReindeer", () => {
    const overdue = communicator.isOverdue(
      reindeer(numberOfDaysBeforeChristmas),
      logger,
    );

    expect(overdue).toBeTruthy();
    expect(logger.getLog()).toEqual("Overdue for Dasher located North Pole.");
  });

  test("shouldReturnFalseWhenNoOverdue", () => {
    const overdue = communicator.isOverdue(
      reindeer(numberOfDaysBeforeChristmas - numberOfDaysToRest - 1),

      logger,
    );
    expect(overdue).toBeFalsy();
  });
  function reindeer(numbersOfDaysForComingBack: number): Reindeer {
    return new Reindeer("Dasher", "North Pole", numbersOfDaysForComingBack);
  }
});
