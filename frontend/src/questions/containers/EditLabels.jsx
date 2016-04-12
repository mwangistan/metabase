import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";

import S from "./EditLabels.css";

import * as labelsActions from "../labels";
import { getLabels, getEditingLabelId } from "../selectors";

import * as colors from "metabase/lib/colors";

const mapStateToProps = (state, props) => {
  return {
      labels: getLabels(state),
      editingLabelId: getEditingLabelId(state)
  }
}

const mapDispatchToProps = {
    ...labelsActions
};

import Icon from "metabase/components/Icon.jsx";

// import LabelEditor from "../components/LabelEditor.jsx";
import LabelEditorForm from "./LabelEditorForm.jsx";
import LabelIcon from "../components/LabelIcon.jsx";

@connect(mapStateToProps, mapDispatchToProps)
export default class EditLabels extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {};
    }

    static propTypes = {};
    static defaultProps = {};

    componentWillMount() {
        this.props.loadLabels();
    }

    render() {
        const { saveLabel, style, editLabel, deleteLabel, editingLabelId } = this.props;
        return (
            <div className={S.editor} style={style}>
                <div className={S.header}>Labels</div>
                <LabelEditorForm onSubmit={saveLabel} initialValues={{ icon: colors.normal.blue, name: "" }}/>
                <ul className={S.list}>
                { this.props.labels && this.props.labels.map(label =>
                    editingLabelId === label.id ?
                        <li key={label.id} className={S.labelEditing}>
                            <LabelEditorForm formKey={String(label.id)} className="flex-full" onSubmit={saveLabel} initialValues={label}/>
                            <a className={" text-grey-1 text-grey-4-hover"} onClick={() => editLabel(null)}>Cancel</a>
                        </li>
                    :
                        <li key={label.id} className={S.label}>
                            <LabelIcon icon={label.icon} size={28} />
                            <span className={S.name}>{label.name}</span>
                            <a className={S.edit} onClick={() => editLabel(label.id)}>Edit</a>
                            <Icon className={S.delete + " text-grey-1 text-grey-4-hover"} name="close" width={14} height={14} onClick={() => deleteLabel(label.id)} />
                        </li>
                )}
                </ul>
            </div>
        );
    }
}
