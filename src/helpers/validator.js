class validator {
    static validateCreateTaskInfo(incomingTaskData, existingTaskData) {
        
        console.log(`Existing Sample Task Data === ${JSON.stringify(existingTaskData.tasks[0],undefined,2)}`)

        let validateAllKeysResult = this.validateAllKeys(incomingTaskData, existingTaskData)
        console.log(`ValidateAllKeysResult  ${JSON.stringify(validateAllKeysResult)}`)
        if (validateAllKeysResult) {
            return validateAllKeysResult
        }
        
        let typeAndNonEmptyCheckResult = this.typeAndNonEmptyCheck(incomingTaskData, existingTaskData)
        console.log(`typeAndNonEmptyCheckResult  ${JSON.stringify(typeAndNonEmptyCheckResult)}`)
        if (typeAndNonEmptyCheckResult) {
            return typeAndNonEmptyCheckResult
        }
        
        let validateTaskIdResult = this.isTaskIdExists(incomingTaskData.taskId, existingTaskData)
        console.log(`validateTaskIdResult  ${JSON.stringify(validateTaskIdResult)}`)
        if (validateTaskIdResult.isTaskIdExists) {
            return {
                "isCorrectData": false,
                "message": validateTaskIdResult.message
            }
        }

        return {
            "isCorrectData": true,
            "message": `Task with Id ${incomingTaskData.taskId} is successfully created`
        } 
  }

  static validateUpdateTaskInfo(incomingTaskData, existingTaskData) {
        
        let validateAllKeysResult = this.validateAllKeys(incomingTaskData, existingTaskData)
        console.log(`validateAllKeysResult  ${JSON.stringify(validateAllKeysResult)}`)
        if (validateAllKeysResult) {
            return validateAllKeysResult
        }
        
        let typeAndNonEmptyCheckResult = this.typeAndNonEmptyCheck(incomingTaskData, existingTaskData)
        console.log(`typeAndNonEmptyCheckResult  ${JSON.stringify(typeAndNonEmptyCheckResult)}`)
        if (typeAndNonEmptyCheckResult) {
            return typeAndNonEmptyCheckResult
        }

        let validateTaskIdResult = this.isTaskIdExists(incomingTaskData.taskId, existingTaskData)
        console.log(`validateTaskIdResult  ${JSON.stringify(validateTaskIdResult)}`)
        if (!(validateTaskIdResult.isTaskIdExists)) {
            return {
                "isCorrectData": false,
                "message": validateTaskIdResult.message
            }
        }

        return {
            "isCorrectData": true,
            "message": `Task with Id ${incomingTaskData.taskId} is successfully updated`
        }


  }

  static validateDeleteTaskInfo(taskId, tasksInfo) {
    
    let validateTaskIdResult = this.isTaskIdExists(taskId, tasksInfo)

    if (validateTaskIdResult.isTaskIdExists) {
        return {
            "isCorrectData": true,
            "message": validateTaskIdResult.message
        }
    } else {
        return {
            "isCorrectData": false,
            "message": validateTaskIdResult.message
        }
    }
  }
  
  // validating if all the keys required for a task are present or not
  static validateAllKeys(incomingTaskData, existingTaskData) {
    console.log(`Incoming task data ${JSON.stringify(incomingTaskData)}, existingTaskData ${JSON.stringify(existingTaskData)}`)
    for (let key of Object.keys(existingTaskData.tasks[0])) {
        if (!(incomingTaskData.hasOwnProperty(key))) {
            return {
                "isCorrectData": false,
                "message": `${key} is missing in the task data`
            }
        }
    }
  }

  // checking the type of each variable and non empty values
  static typeAndNonEmptyCheck(incomingTaskData, existingTaskData) {
    for (let key of Object.keys(existingTaskData.tasks[0])) {
        if ((incomingTaskData.hasOwnProperty(key))) { 
            if( !(typeof(existingTaskData.tasks[0][key]) === typeof(incomingTaskData[key])) ) {
                console.log(`Existing Data Type of ${key} is ${(typeof(existingTaskData.tasks[0][key]))} Incoming Data Type of ${incomingTaskData[key]} is ${typeof(incomingTaskData[key])}`)
                return {
                    "isCorrectData": false,
                    "message": `type of ${key} should be ${(typeof(existingTaskData.tasks[0][key]))}`
                }
            } else if (incomingTaskData[key].length < 1) {
                return {
                    "isCorrectData": false,
                    "message": `${key} should be non empty`
                }
            }
        }
    }
  }

  // validate unique taskId
  static isTaskIdExists(taskId, existingTaskData) {
    for (let existingTask of existingTaskData.tasks) {
        if (existingTask.taskId == taskId) {
            return {
                "isTaskIdExists": true,
                "message": `Task Id ${taskId} is already exisiting in the task data`
            }
        } 
    }
    return {
        "isTaskIdExists": false,
        "message": `Task Id ${taskId} is not exisiting in the task data`
    }
  }


}
  
module.exports = validator;