import React from 'react'
import classes from './QuizCreator.css'
import Button from '../../components/UI/Button/Button'
import {createControl, validate, validateForm} from  '../../form/formFramework'
import Input from '../../components/UI/Input/Input'
import Select from '../../components/UI/Select/Select'
import {connect} from 'react-redux'
import {createQuizQuestion, finishCreateQuiz} from "../../store/actions/create";

function createOptionControl(number) {
  return createControl({
    label: 'Вариант ' + number,
    errorMessage: 'Значение не может быть пустым',
    id: number
  }, {required: true})
}

function createFormControls() {
  return {
    question: createControl({
      label: 'Введите вопрос',
      errorMessager: 'Вопрос не може быть пустым'
    }, {required: true}),
    option1: createOptionControl(1),
    option2: createOptionControl(2),
    option3: createOptionControl(3),
    option4: createOptionControl(4)
  }
}

class QuizCreator extends React.Component{
  state= {
    isFormValid: false,
    rightAnswerId: 1,
    formControls: createFormControls()
  };

  onChangeHandler = (event, controlName) => {
    const formControls = {...this.state.formControls};
    const control = {...formControls[controlName]};
    control.touched = true;
    control.value = event.target.value;
    control.valid= validate(control.value, control.validation);
    formControls[controlName] = control;

    this.setState({
      formControls,
      isFormValid: validateForm(formControls)
    })
  };

  renderControls = () => {
    const inputName = Object.keys(this.state.formControls);

    return inputName.map((inp, index)=>{
      const object = this.state.formControls[inp];

      return (
        <React.Fragment key={index}>
          <Input
            label={object.label}
            type='text'
            errorMessage={object.errorMessage}
            touched={object.touched}
            valid={object.valid}
            value={object.value}
            onChange={(event)=>this.onChangeHandler(event, inp)}
            shouldValidate={!!object.validation}
          />
          {index === 0 ? <hr/> : null}
        </React.Fragment>
      )
    })
  };

  selectChangeHandler = (event) => {
    this.setState({
      rightAnswerId: +event.target.value
    })
  };

  submitHandler = (e) => {
    e.preventDefault();
  };

  addQuestionHandler = (e) => {
    e.preventDefault();
    const {question, option1, option2, option3, option4} = this.state.formControls;
    const questionItem = {
      question: question.value,
      id:this.props.quiz.length +1,
      rightAnswerId: this.state.rightAnswerId,
      answers:[
        {text: option1.value, id:option1.id},
        {text: option2.value, id:option2.id},
        {text: option3.value, id:option3.id},
        {text: option4.value, id:option4.id},
      ]
    };
    this.props.createQuizQuestion(questionItem);

    this.setState({
      isFormValid: false,
      rightAnswerId: 1,
      formControls: createFormControls()
    });
  };

  createQuizHandler = (e) =>{
    e.preventDefault();
    this.props.finishCreateQuiz();
    this.setState({
      isFormValid: false,
      rightAnswerId: 1,
      formControls: createFormControls()
    });
  };

  render() {
    const select = <Select
      label='Выберите правильный ответ'
      value={this.state.rightAnswerId}
      onChange={this.selectChangeHandler}
      options={[
        {text:'1', value:1},
        {text:'2', value:2},
        {text:'3', value:3},
        {text:'4', value:4},
      ]}
    />;

    return (
      <div className={classes.QuizCreator}>
        <div>
          <h1>Создание теста</h1>
          <form onSubmit={this.submitHandler}>
            {this.renderControls() }
            {select}
            <Button type='primary' disabled={!this.state.isFormValid} onClick={this.addQuestionHandler}>Добавить вопрос</Button>
            <Button type='success' disabled={this.props.quiz.length === 0} onClick={this.createQuizHandler}>Завершить создание теста</Button>
          </form>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    quiz: state.create.quiz
  }
}

function mapDispatchToProps(dispatch) {
  return {
    createQuizQuestion: (item)=>dispatch(createQuizQuestion(item)),
    finishCreateQuiz: ()=>dispatch(finishCreateQuiz())
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(QuizCreator)