import React from 'react';
import PropTypes from 'prop-types';
import update from 'immutability-helper';
import storage from 'store';
import Drawer from './Drawer';
import { StyledForm, StyledInput } from '../shared/Forms';
import { GC_USER_ID } from '../../utils/graphcool';

const CreateForm = ({
  fields,
  create,
  createIsOpen,
  clearForm,
  toggleCreateIsOpen,
  staticFields,
  children,
}) => {
  const fieldData = Object.keys(fields);
  const handleSubmit = (e) => {
    e.preventDefault();
    const userId = storage.get(GC_USER_ID);
    const fieldValues = fieldData.reduce((acc, key) => {
      const newObj = update(acc, { $merge: { [key]: fields[key].value } });
      return newObj;
    }, {});
    create({ ...fieldValues, ...staticFields, userId });
    clearForm();
    toggleCreateIsOpen();
  };
  return (
    <Drawer open={createIsOpen}>
      <StyledForm open={createIsOpen} onSubmit={handleSubmit}>
        {children(fieldData)}
        <StyledInput type="submit" value="Create Member" />
      </StyledForm>
    </Drawer>
  );
};

CreateForm.propTypes = {
  children: PropTypes.func.isRequired,
  clearForm: PropTypes.func.isRequired,
  fields: PropTypes.objectOf(PropTypes.object).isRequired,
  staticFields: PropTypes.objectOf(PropTypes.any),
  createIsOpen: PropTypes.bool.isRequired,
  toggleCreateIsOpen: PropTypes.func.isRequired,
  create: PropTypes.func.isRequired,
};

CreateForm.defaultProps = {
  staticFields: [],
};

export default CreateForm;
