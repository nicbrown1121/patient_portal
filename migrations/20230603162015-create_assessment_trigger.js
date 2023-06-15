"use strict";

/** @type {import('sequelize-cli').Migration} */
/* If assessment is completed, set 'seen' on Patient table to true*/
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(`
      CREATE OR REPLACE FUNCTION after_assessment_update()
      RETURNS TRIGGER AS $$
      BEGIN
        IF NEW."completed" = true THEN
          UPDATE "Patients"
          SET "seen" = true
          WHERE "Patients"."id" = NEW."patientId";
        END IF;
        RETURN NEW;
      END;
      $$ LANGUAGE plpgsql;

      CREATE TRIGGER after_assessment_update
      AFTER UPDATE ON "Assessments"
      FOR EACH ROW
      EXECUTE FUNCTION after_assessment_update();
    `);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(`
      DROP TRIGGER after_assessment_update ON "Assessments";
      DROP FUNCTION after_assessment_update;
    `);
  },
};
