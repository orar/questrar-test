
//  Initial request state
const $id = Symbol('request_test_id');

export const initialRequest = {
  $id,
  pending: false,
  success: false,
  failed: false,
  successCount: 0,
  failureCount: 0,
  clean: true
};
