import { Formik } from "formik";
import FormField from "../forms/fields/form-field";

export default function Search() {
  return (
    <Formik
      initialValues={{
        q: "",
      }}
      onSubmit={(values) => {}}
      enableReinitialize
    >
      {({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <FormField name="q" placeholder="Search" />
        </form>
      )}
    </Formik>
  );
}
