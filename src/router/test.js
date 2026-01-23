import TempView from '../views/TempView.vue';
import AnotherView from '../views/AnotherView.vue';
import InputView from '../views/InputView.vue';
import OutputView from '../views/OutputView.vue';
import LoadTestView from '../views/LoadTestView.vue';

const routes = [    
    {path: '/', name: "LoadTest", component: LoadTestView},
    {path: '/temp', name: "Temp", component: TempView},
    {path: '/another', name: "Another", component: AnotherView},
    {path: '/input', name: "Input", component: InputView},
    {path: '/output', name: "Output", component: OutputView},
]

export default routes;