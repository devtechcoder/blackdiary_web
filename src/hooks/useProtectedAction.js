import { useCallback, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeAuthModal, clearPendingAuthAction, openAuthModal, selectPendingAuthAction } from "../redux/slices/modalSlice";
import { selectIsAuthenticated } from "../redux/slices/authSlice";
import { getCurrentPathWithSearch } from "../utils/authRedirect";

const useProtectedAction = (defaultOptions = {}) => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const pendingAuthAction = useSelector(selectPendingAuthAction);
  const defaultExecuteRef = useRef(defaultOptions.execute);
  const defaultActionKeyRef = useRef(defaultOptions.actionKey || null);
  const defaultPayloadRef = useRef(defaultOptions.payload ?? null);

  useEffect(() => {
    defaultExecuteRef.current = defaultOptions.execute;
  }, [defaultOptions.execute]);

  useEffect(() => {
    defaultActionKeyRef.current = defaultOptions.actionKey || null;
  }, [defaultOptions.actionKey]);

  useEffect(() => {
    defaultPayloadRef.current = defaultOptions.payload ?? null;
  }, [defaultOptions.payload]);

  useEffect(() => {
    if (!isAuthenticated || !pendingAuthAction) {
      return;
    }

    const currentActionKey = defaultActionKeyRef.current;
    if (!currentActionKey || pendingAuthAction.actionKey !== currentActionKey) {
      return;
    }

    const execute = defaultExecuteRef.current;
    if (typeof execute !== "function") {
      return;
    }

    execute(pendingAuthAction.payload ?? defaultPayloadRef.current);
    dispatch(clearPendingAuthAction());
    dispatch(closeAuthModal());
  }, [dispatch, isAuthenticated, pendingAuthAction]);

  return useCallback(
    (callback, options = {}) => {
      const actionKey = options.actionKey || defaultActionKeyRef.current;
      const payload = options.payload ?? defaultPayloadRef.current ?? null;
      const execute = typeof callback === "function" ? callback : defaultExecuteRef.current;

      if (!isAuthenticated) {
        dispatch(
          openAuthModal({
            pendingAuthAction: actionKey ? { actionKey, payload } : null,
            returnTo: options.returnTo || getCurrentPathWithSearch(),
          }),
        );
        return false;
      }

      if (typeof execute === "function") {
        execute(payload);
        return true;
      }

      if (options.routeToLogin && typeof window !== "undefined") {
        window.location.assign(options.routeToLogin);
      }

      return false;
    },
    [dispatch, isAuthenticated],
  );
};

export default useProtectedAction;
