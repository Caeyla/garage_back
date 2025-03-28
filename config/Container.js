/****************************************************************************/
// ADAPTERS IMPORT
/****************************************************************************/

const CustomerAdapter = require("../adapters/CustomerAdapter");
const EmployeeAdapter = require("../adapters/EmployeeAdapter");
const VehicleAdapter = require("../adapters/VehicleAdapter");
const PrestationAdapter = require("../adapters/PrestationAdapter");
const AppointmentAdapter = require("../adapters/AppointmentAdapter");
const PieceAdapter = require("../adapters/PieceAdapter");
const SpecialityAdapter = require("../adapters/SpecialityAdapter");

/**************************************************************************/
// USER USECASES IMPORT
/**************************************************************************/

const UserCreateUseCase = require("../domain/usecases/user/UserCreateUseCase");
const UserLoginUseCase = require("../domain/usecases/user/UserLoginUseCase");
const UserRetrieveUseCase = require("../domain/usecases/user/UserRetrieveUseCase");
const UserUpdateteUseCase = require("../domain/usecases/user/UserUpdateUseCase");

/**************************************************************************/
// VEHICLE USECASES IMPORT
/**************************************************************************/

const VehicleCreateUseCase = require("../domain/usecases/vehicle/VehicleCreateUseCase");
const VehicleUpdateUseCase = require("../domain/usecases/vehicle/VehicleUpdateUseCase");
const VehicleRetrieveUseCase = require("../domain/usecases/vehicle/VehicleRetrieveUseCase");

/**************************************************************************/
// PRESTATION USECASES  IMPORT
/**************************************************************************/

const PrestationUseCase = require("../domain/usecases/prestation/PrestationUseCase");

/***************************************************************************/
// PIECE USECASES IMPORT
/***************************************************************************/

const PieceUseCase = require("../domain/usecases/piece/PieceUseCase");

/***************************************************************************/
// SPECIALITY USECASES IMPORT
/***************************************************************************/

const SpecialityUseCase = require("../domain/usecases/speciality/SpecialityUseCase");

/****************************************************************************/
// APPOINTMENT USECASES IMPORT
/****************************************************************************/

const AppointmentCreateUseCase = require("../domain/usecases/appointment/AppointmentCreateUseCase");
const AppointmentRetrieveUseCase = require("../domain/usecases/appointment/AppointmentRetrieveUseCase");
const AppointmentUpdateUseCase = require("../domain/usecases/appointment/AppointmentUpdateUseCase");

/****************************************************************************/
// ADAPTER INSTANCE
/****************************************************************************/

const customerAdapter = new CustomerAdapter();
const employeeAdapter = new EmployeeAdapter();
const vehicleAdapter = new VehicleAdapter();
const prestationAdapter = new PrestationAdapter();
const appointmentAdapter = new AppointmentAdapter();
const pieceAdapter = new PieceAdapter();
const specialityAdapter = new SpecialityAdapter();

/****************************************************************************/
//  USER USECASES INSTANCE
/****************************************************************************/

const userCreateUseCase = new UserCreateUseCase(customerAdapter, employeeAdapter);
const userLoginUseCase = new UserLoginUseCase(customerAdapter, employeeAdapter);
const userRetrieveUseCase = new UserRetrieveUseCase(customerAdapter, employeeAdapter);
const userUpdateUseCase =  new UserUpdateteUseCase(customerAdapter, employeeAdapter);

/****************************************************************************/
//  VEHICLE USECASES INSTANCE
/****************************************************************************/

const vehicleCreateUseCase = new VehicleCreateUseCase(vehicleAdapter,customerAdapter);
const vehicleRetrieveUseCase = new VehicleRetrieveUseCase(vehicleAdapter,customerAdapter);
const vehicleUpdateUseCase = new VehicleUpdateUseCase(vehicleAdapter,customerAdapter);

/****************************************************************************/
//  PRESTATION USECASES INSTANCE
/****************************************************************************/

const prestationUseCase = new PrestationUseCase(prestationAdapter,specialityAdapter);

/****************************************************************************/
//  SPECIALITY USECASES INSTANCE
/****************************************************************************/

const specialityUseCase = new SpecialityUseCase(specialityAdapter);

/****************************************************************************/
//  PIECE USECASES INSTANCE
/****************************************************************************/

const pieceUseCase = new PieceUseCase(pieceAdapter);

/****************************************************************************/
//  APPOINTMENT USECASES INSTANCE
/****************************************************************************/

const appointmentCreateUseCase = new AppointmentCreateUseCase(appointmentAdapter,vehicleAdapter,prestationAdapter);
const appointmentRetrieveUseCase = new AppointmentRetrieveUseCase(appointmentAdapter);
const appointmentUpdateUseCase = new AppointmentUpdateUseCase(appointmentAdapter);

module.exports = {
    userCreateUseCase,
    userLoginUseCase,
    userRetrieveUseCase,
    userUpdateUseCase,
    vehicleCreateUseCase,
    vehicleUpdateUseCase,
    vehicleRetrieveUseCase,
    prestationUseCase,
    appointmentCreateUseCase,
    appointmentRetrieveUseCase,
    appointmentUpdateUseCase,
    pieceUseCase,
    specialityUseCase
}