import React from "react";
import { SaveStudent } from "services";
import { StudentForm } from "./form";

export default function CrateStudentPage() {
  return (
    <SaveStudent>
      <StudentForm />
    </SaveStudent>
  )
}
