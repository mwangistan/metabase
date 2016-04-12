import React, { Component, PropTypes } from "react";
import S from "./LabelEditorForm.css";

import LabelIconPicker from "../components/LabelIconPicker.jsx";

import { reduxForm } from "redux-form";

import cx from "classnames";

@reduxForm({
    form: 'label',
    fields: ['icon', 'name', 'id'],
    validate: (values) => {
        const errors = {};
        if (!values.name) {
            errors.name = "Name is required";
        }
        if (!values.icon) {
            errors.icon = "Icon is required";
        }
        return errors;
    }
})
export default class LabelEditorForm extends Component {
    render() {
        const { fields: { icon, name }, handleSubmit, invalid, className } = this.props;
        return (
            <form className={cx(className, S.form)} onSubmit={handleSubmit}>
                <LabelIconPicker {...icon} />
                <input className={S.nameInput+ " input"} type="text" placeholder="Name" {...name}/>
                <button className={cx("Button", { "disabled": invalid })} type="submit">Submit</button>
            </form>
        );
    }
}
