import { createParameter, getParameterByKey, getParameterList, updateParameter } from "@/api/parameter";
import { create } from "zustand";
import { useLayoutStore } from "../layout";
import { showNotification } from "@mantine/notifications";

const { showLoading, hideLoading } = useLayoutStore.getState();

interface ParameterStore {
    trainModelInterval: '';
    getTrainModelInterval: (key: string) => void;
    parameterList: Parameter[];
    setParameterList: (parameterList: Parameter[]) => void;
    getParameterList: () => void;
    createParameter: (parameter: RequestNewParameter) => void;
    updateParameter: (parameter: RequestNewParameter) => void;
    // deleteParameter: (id: string) => void;
    // uploadParameter: (req: FormData) => void;
    resetParameterStore: () => void;
}

export const useParameterStore = create<ParameterStore>()((set) => ({
    trainModelInterval: '',
    getTrainModelInterval: async (key) => {
        await getParameterByKey(key).then((res) => {
            if (res.code === 200) {
                set({ trainModelInterval: res.data.value }); 
            }
        })
    },
    parameterList: [],
    setParameterList: (parameterList: Parameter[]) => set({ parameterList }),
    getParameterList: async () => {
        showLoading();
        await getParameterList().then((res) => {
            if (res.code === 200) {
                set({ parameterList: res.data });
            }
        }).finally(() => {
            hideLoading();
        });
    },
    createParameter: async (parameter: RequestNewParameter) => {
        showLoading();
        await createParameter(parameter).then((res) => {
            if (res.code === 200) {
                showNotification({
                    color: 'green',
                    title: 'Success',
                    message: res.message,
                });
            }
        }).finally(() => {
            hideLoading();
        });
    },

    updateParameter: async (parameter: RequestNewParameter) => {
        showLoading();
        await updateParameter(parameter).then((res) => {
            if (res.code === 200) {
                showNotification({
                    color: 'green',
                    title: 'Success',
                    message: res.message,
                });
            }
        }).finally(() => {
            hideLoading();
        });
    },

    resetParameterStore: () => set({ parameterList: [] }),
}));