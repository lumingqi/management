import lessonRecord from './pagemodules/studentinfo/lessonRecord'
import courseRecord from './pagemodules/studentinfo/courseRecord'
import payRecord from './pagemodules/studentinfo/payRecord'
import callbackRecord from './pagemodules/studentinfo/callbackRecord'
import salaryRecord from './pagemodules/studentinfo/salaryRecord'
import lessonleaveRecord from './pagemodules/studentinfo/lessonleaveRecord'
import eventsRecord from './pagemodules/studentinfo/eventsRecord'
import courseOrderRecord from './pagemodules/studentinfo/courseOrderRecord'

let pages =[]
pages.push(courseOrderRecord)
pages.push(courseRecord)
pages.push(payRecord)
pages.push(callbackRecord)
pages.push(salaryRecord)
pages.push(lessonleaveRecord)
pages.push(eventsRecord)


export default pages