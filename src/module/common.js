// @flow
import React from 'react';
import type { RequestState } from "../index";


//status flags
export const PENDING = 'pending';
export const SUCCESS = 'success';
export const FAILED = 'failed';

//action flags
export const REPLACE = 'replace';
export const REMOVE = 'remove';


//Initial request state
export const initialRequest: RequestState = {
  pending: false,
  success: false,
  failed: false,
  successCount: 0,
  failureCount: 0,
  message: ''
};
