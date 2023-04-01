import React, { useState } from "react";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";

export default function DatePicker() {
    return (
        <>

            <Datetime value={new Date()} className="w-60 appearance-none shadow border rounded-lg py-3 px-2 " />
        </>
    );
}