import { Routes } from '@angular/router';

export const routes: Routes = [

    {
        path:'',
        loadComponent:() => import('./components/fichero.component/fichero.component').then(c => c.FicheroComponent)
    }
];
